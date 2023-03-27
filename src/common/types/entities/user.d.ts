interface User {
  id: number
  mobile: string
  username: string
  sex: import('~/enum').Sex
  avatar: string
  profile: string
  signUpTime: Date
}
