interface User {
  id: number
  mobile: string
  username: string
  password: string
  sex: import('~/enum').Sex
  avatar: string
  profile: string
  signUpTime: Date
}
