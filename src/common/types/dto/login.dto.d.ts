interface PasswordLoginDto {
  accountType: import('~/enum').AccountType
  account: string
  password: string
}

interface VerifyLoginDto {
  accountType: import('~/enum').AccountType
  account: string
  verifyCode: string
}
