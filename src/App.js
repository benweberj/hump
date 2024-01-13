import { GlobalStyles } from './styles'
import DollarDoors from './DollarDoors'

function App() {
    return (
        <div className='app'>
            <div id='bg' style={{ transition: 'filter 0.5s ease' }} />
            <GlobalStyles />
            <DollarDoors />
        </div>
    )
}

export default App;
