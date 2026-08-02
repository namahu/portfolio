import { Suspense } from 'react'
import { ProjectList } from './features/projects/components/project-list'
import { getProjects } from './features/projects/api/get-projects'
import './App.css'

function App() {
  const projectsPromise = getProjects();

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <ProjectList projectPromise={projectsPromise} />
    </Suspense>
  )
}

export default App
