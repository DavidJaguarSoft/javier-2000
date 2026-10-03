import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Props = {}

const DashboardPage = (props: Props) => {

  const navigate = useNavigate()
  const myToken = localStorage.getItem("token")
  //console.log('My Token in Dashboard: ', myToken)

  //   const myToken = localStorage.getItem("token")
  //   console.log('My Token: ', myToken)

  useEffect(() => {
    //   const getProfileInit = async () => {
    //     // const result = await getCompanyProfile(ticker!)
    //     // setCompany(result?.data[0])
    //   }
      
      if(!myToken){
        navigate('/login')  
      }
    }, [])

    const logout = async() => {
      localStorage.setItem('token', '')
      localStorage.setItem('username', '')
      localStorage.setItem('usermail', '')
      navigate('/home')
    }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Dashboard
            </h1>
            <div>
              <button onClick={() =>{ logout()}}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
