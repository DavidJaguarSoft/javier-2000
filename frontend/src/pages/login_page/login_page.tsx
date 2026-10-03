import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
//import { use Auth } from "../../context/use_auth"
import { useForm } from "react-hook-form"
//import { loginRequest, profileRequest } from "../../api/auth"
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { useState } from "react"

type LoginFormsInputs = {
  email: string
  password: string
}

const validation = Yup.object().shape({
  email: Yup.string().required("El correo es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
})

const LoginPage = () => {
  //const { loginUser } = use xAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) })

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleLogin = async (form: LoginFormsInputs) => {
    try {
      const myEmail = form.email
      const myPassword = form.password
      console.log('form.email', form.email)
      console.log('form.password', form.password)
      
      const response = await axios.post("http://localhost:3000/login", {
        'correo': myEmail,
        'contrasena': myPassword,
      })
      
      //  Eliminados datos del usuario anterior
      localStorage.setItem('token', '')
      localStorage.setItem('username', '')
      localStorage.setItem('usermail', '')

      toast.success("Hola " + response.data.profile.Username + "")
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

      if (err.response) {
        if(err.response.status == 401){
          setErrorMessage("Su correo no ha sido registrado")
          toast.warning("Su correo no ha sido registrado")
        } else if (err.response.status == 402) {
          setErrorMessage('Contraseña inválida')
          toast.warning('Contraseña inválida')
        } else {
          setErrorMessage(err.response.data.error || "Error en login")
          toast.warning("Ocurrió un error al momento de logearse")
        }
      } else if (err.request) {
        // No hubo respuesta del servidor
        toast.warning("No se pudo conectar con el servidor")
        setErrorMessage("No se pudo conectar con el servidor")
      } else {
        // Error inesperado en la configuración de la petición
        toast.warning("Error inesperado, intenta de nuevo")
        setErrorMessage("Error inesperado, intenta de nuevo")
      }
    }
    //navigate('/dashboard')
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
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
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                />
                {errors.password ? (
                  <p className="text-white">{errors.password.message}</p>
                ) : (
                  ""
                )}
              </div>
              
              <button
                type="submit"
                className="w-full text-white bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              
              <p/>
              <p/>
              <p className="mt-3 text-sm font-light text-gray-500 dark:text-gray-400">
                Deseas registrartge ?{" "}
                <a href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Registrarse
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage

// function setErrorMessage(arg: null) {
//   throw new Error("Function not implemented.")
// }

