import { IsEmail, IsNotEmpty, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto {    
  @IsString()
  readonly name:string

  @IsNotEmpty()
  @IsEmail()
  readonly email:string
  
  @IsNotEmpty()
  @MinLength(6)
  readonly password:string

}
