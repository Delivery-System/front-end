export interface UserLogin{
    success:boolean,
    token:string,
    user:{
      id:string,
      account:{
        role:string,
        firstName:string,
        lastName:string,
        userName:string,
        email:string,
        password:string
      },
      phoneNumber:string,
      address:string
    }
  }