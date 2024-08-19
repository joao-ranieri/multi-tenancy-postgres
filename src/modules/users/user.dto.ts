import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
    @ApiProperty({ type: String, name: 'name', required: true })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: String, name: 'email', required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, name: 'password', required: true })
    @IsNotEmpty()
    password: string;
}