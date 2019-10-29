export interface User {
    login: string
    email: string
    password: string
  }

export interface Blog {
    name: string
    description: string
    imageSrc?: string
    user?: string
    _id?: string
}