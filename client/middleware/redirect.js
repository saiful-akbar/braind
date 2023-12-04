export default function ({ route, redirect }) {
  if (route.path === '/one') {
    redirect('/')
  }
}