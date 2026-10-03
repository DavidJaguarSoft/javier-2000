
export class UserPlay {
  username: string
  email: string
  password: string
  balance: string

  constructor(
     username: string,
     email: string,
     password: string,
     balance: string,
    ) {
    this.username = username
    this.email = email
    this.password = password
    this.balance = balance
  }
}