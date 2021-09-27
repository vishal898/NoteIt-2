import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import Demo from './components/Demo';
function App() {
  return (
    <ChakraProvider>
      <Demo/>
    </ChakraProvider>
  )
}



export default App;
