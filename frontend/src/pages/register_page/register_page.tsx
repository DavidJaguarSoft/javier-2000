import React, { useState } from "react"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
//import { use Auth } from "../../context/use_auth"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type Props = {}

type RegisterFormsInputs = {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

const validation = Yup.object().shape({
  userName: Yup.string().required("El Nombre completo del usuario es requerido"),
  email: Yup.string().required("El corre es requirido"),
  password: Yup.string().required("La contraseña es requerida"),
  confirmPassword: Yup.string().required("La confirmación de la contraseña es requerida"),
})

const RegisterPage = (props: Props) => {
  //const { registerUser } = use Auth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) })

  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = async (form: RegisterFormsInputs) => {
    //registerUser(form.userName, form.email, form.password, form.confirmPassword)

    try {
      const myUsername = form.userName
      const myEmail = form.email
      const myPassword = form.password
      const myConfirmPassword = form.confirmPassword

      console.log("Registro pass: ", myPassword, myConfirmPassword)
      if(myPassword != myConfirmPassword){
        toast.warning("Las contraseñas no coinciden")
        setErrorMessage("Las contraseñas no coinciden")
        "Error inesperado, intenta de nuevo"
        return
      }
      
      const response = await axios.post("http://localhost:3000/register", {
        'usuario': myUsername,
        'correo': myEmail,
        'contrasena': myPassword,
      })

      toast.success("Bienvenido al sistema " + myUsername + ", disfrútalo !")
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("username", response.data.profile.Username)
      localStorage.setItem("usermail", response.data.profile.EMail)

      console.log("token", response.data.token)
      console.log("username", response.data.profile.Username)
      console.log("usermail", response.data.profile.EMail)

      setErrorMessage(null)
      navigate('/dashboard')

    } catch (error) {
      const err = error as AxiosError<{ error: string }>
      //toast.warning("Server error occured: " + err)
      //console.log("Error en handleLogin:", err)

      if (err.response) {
        if(err.response.status == 403){
          toast.warning("Este correo ya se ha registrado")
        } else {
          setErrorMessage(err.response.data.error || "Humbo un problema con el registro del usuario")
          toast.warning("Humbo un problema con el registro del usuario")
        }
      } else if (err.request) {
        // No hubo respuesta del servidor
        setErrorMessage("No se pudo conectar con el servidor")
        console.log(err.request)
      } else {
        // Error inesperado en la configuración de la petición
        setErrorMessage("Error inesperado, intenta de nuevo")
        console.log("Error inesperado, intenta de nuevo")
      }

      //console.error("Error en handleLogin:", err)
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registro de Usuarios
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleRegister)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nombre"
                  {...register("userName")}
                />
                {errors.userName ? (
                  <p className="text-white">{errors.userName.message}</p>
                ) : (
                  ""
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Correo electrónico"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-white">{errors.email.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password ? (
                  <p className="text-white">{errors.password.message}</p>
                ) : (
                  ""
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("confirmPassword")}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword ? (
                  <p className="text-white">{errors.confirmPassword.message}</p>
                ) : (
                  ""
                )}
              </div>
              
              <button
                type="submit"
                className="w-full text-white bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Registrarse
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage

function setErrorMessage(arg: null) {
  throw new Error("Function not implemented.")
}

