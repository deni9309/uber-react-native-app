import { Href, Redirect } from 'expo-router'

const Page = () => {
  return <Redirect href={"/(auth)/welcome" as Href} />
}

export default Page
