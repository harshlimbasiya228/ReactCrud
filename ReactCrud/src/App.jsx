import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loggin from './Components/Loggin'
import Student from './Student'
import StudentDetails from './StudentDetails'
import EditStudent from './EditStudent'
function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loggin/>}/>
        <Route path='/Student' element={<Student/>}/>
        <Route path='/student/:id' element={<StudentDetails/>}/>
        <Route path='/student/edit/:id' element={<EditStudent/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
