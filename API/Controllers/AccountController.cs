
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext context;
        private readonly ITokenService tokenService;

        public AccountController(DataContext context,ITokenService tokenService)
        {
            this.context = context;
            this.tokenService = tokenService;
        }

        [HttpPost("register")] // api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){

            if (await UserExist(registerDto.UserName)) return BadRequest("Username already exists");

            //"using" disposes the HMAC class after it is used
            using var hmac=new HMACSHA512();
            var user=new AppUser{
                UserName=registerDto.UserName.ToLower(),
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt=hmac.Key
            };
            // whenever context i used it is used for communication with the database;
            context.Users.Add(user);

            await context.SaveChangesAsync();

            return new UserDto{
                Username=user.UserName,
                Token=tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExist(string username){
            return await context.Users.AnyAsync(x => x.UserName ==username.ToLower());
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){

            var user=await context.Users.SingleOrDefaultAsync(x=> x.UserName == loginDto.UserName);

            // bool userFound=await UserExist(registerDto.UserName);

            if(user==null)return Unauthorized("user not found");
            using var hmac =new HMACSHA512(user.PasswordSalt);
            var computedhash=hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            // if(computedhash!=user.PasswordHash)return Unauthorized();
            for(int i=0;i<computedhash.Length;i++){
                if(computedhash[i]!=user.PasswordHash[i])return Unauthorized("Password not valid");
            }

            return new UserDto{
                Username=user.UserName,
                Token=tokenService.CreateToken(user)
            };
        }

    }
}