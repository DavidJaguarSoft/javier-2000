import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserPlay } from '../models/user_play'
import bcrypt from 'bcrypt'
import { getItem, setItem } from '../utils/storage'

export const registerHandler = async (req: Request, res: Response) => {

  //  Se encripta la contraseña
  const myHash = 10
  const passEncrypt = await bcrypt.hash(req.body.contrasena, myHash)

  //  Creamos un objeo tipo 'UserPlay' con la contraseña encriptada
  const newUser = new UserPlay(
    req.body.usuario,
    req.body.correo,
    passEncrypt,
    '0',
  )
  //console.log('newUser: ', newUser)

  //  Recuperamos de la BD (simulación) los usuarios registrados
  const userList = getItem('UserList')
  //console.log('getItem(UserList): ', userList)

  let users: UserPlay[] = []

  if(userList){
    //console.log('userList tiene datos: ', userList)
    //  Creamos una lista de Usuarios y guardamos la lista recuperada
    users = JSON.parse(userList)
    //  Verificamos que no este registrado el correo del usuario
    for(const iu of users){
      const strIUemail = iu.email.trim().toLowerCase()
      const strNewUser = newUser.email.trim().toLowerCase()
      //if(iu.email == newUser.email){
      if(strIUemail === strNewUser){
          //  Usuario ya registrado
          return res.status(403).json([{ message: "Este correo ya se ha registrado" }])
      }
    }
  }
  //  Guardamos al nuevo usuario
  users.push(newUser)
  //await local Storage.setItem('UserList', JSON.stringify(users))
  //await redis.set('UserList', JSON.stringify(users))
  //console.log('userListJson: ', JSON.stringify(users))
  //console.log('userList: ', users)
  setItem('UserList', JSON.stringify(users))

  const token = jwt.sign({
      username: newUser.username,
      email: newUser.email,
    }, 'mywordtoken', {
      expiresIn: 3600
    }
  )

  return res.json({
    token: token,
    profile: {
        'Username': newUser.username,
        'EMail': newUser.email,
        'Balance': newUser.balance,
    }
  })
}

export const loginHandler = async (req: Request, res: Response) => {
    // req.body = {email: 'javier@hotmail.com', password: '123456789'}
    // Generacion de Token
    
    const myEmail = req.body.correo
    const myPass = req.body.contrasena

    //  Recuperamos de la BD (simulada) los usuarios registrados
    const userList = getItem('UserList')
    let userMatch: UserPlay | undefined
    //console.log('Hola44 userList', userList)
    if(userList != null){
      //  Creamos una lista de Usuarios y guardamos la lista recuperada
      let users: UserPlay[] = []
      users = JSON.parse(userList)

      //userMatch = users.find(i => i.email.toUpperCase() === myEmail.toUpperCase())
      for(const iu of users){
        const strIUemail = iu.email.trim().toLowerCase()
        const strMyEmail = myEmail.trim().toLowerCase()
        //console.log('emails...: ', strIUemail, strMyEmail)
        if(strIUemail === strMyEmail){
            userMatch = iu
            break
        }
      }

      //console.log('userMatch: ', userMatch)
      //  Si no esta registrado salir
      if(!userMatch){
        return res.status(401)
                  .json([{ message: "Su correo no ha sido registrado" }])
      }

      const validPass = await bcrypt.compare(myPass, userMatch.password)
      if(!validPass){
        //  Contraseña inválida
        return res.status(402)
                  .json({ message: "Contraseña inválida" })
      }
    } else {
       return res.status(401)
                  .json({ error: "Su correo no ha sido registrado" })
    }

    // console.log(
    //     'usuario: ', myEmail,
    //     'Contraseña:', myPass,
    // )

    const token = jwt.sign({
        test: "test"
        }, 'mywordtoken', {
            expiresIn: 3600
        }
    )

    return res.json({
        token: token,
        profile: {
          'Username': userMatch.username,
          'EMail': userMatch.email,
          'Balance': userMatch.balance,
        }
    })
}

export const profileHandler = (req: Request, res: Response) =>{
    return res.json({
        "message": "My Data Profile"
    })
}