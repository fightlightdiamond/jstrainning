import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EmailUniqueValidator } from '@app/shared/common/validators/email-unique.validator';
import { MESSAGE, REGEX } from '@app/shared/common/contracts/user.const';

export class RegisterReqDto {
  @ApiProperty({
    description: 'The address email',
    example: 'hero@bet-gamex.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @EmailUniqueValidator()
  email: string;

  @ApiProperty({
    description: 'The password',
    example: 'Hero@123-gamex.com',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGE.PASSWORD_RULE_MESSAGE,
  })
  password: string;

  @ApiProperty({
    description: 'The password confirmation',
    example: 'Hero@123-gamex.com',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGE.CONFIRMATION_PASSWORD_RULE_MESSAGE,
  })
  confirmation_password: string;
}
