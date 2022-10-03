import { useLocation, useNavigate } from 'react-router-dom'
import client from '../../utils/client'
import { useEffect, useState } from 'react'
import { Link, Checkbox } from '@mui/material';

const ExerciseView = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [currentExercise, setCurrentExercise] = useState({})
    const [logList, setLogList] = useState([])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    useEffect(() => {
        client
            .get(`/exercise/${location.state.id}`)
            .then(res => setCurrentExercise(res.data.data.exercise))
    }, [location.state.id]);

    useEffect(() => {
        client
            .get(`/log?exerciseId=2`)
            .then(res => setLogList(res.data.data.logs))
    }, [])

    const handleClick = (log) => navigate(`/cohort/${log.cohortId}`)

    if (!currentExercise.objectives) {
        return <></>
    }

    return (
        <div className='exercise'>
            <h1>{currentExercise.name}</h1>
            <h3 style={{ textAlign: 'start' }}>Learning Objectives:</h3>
            <div>{currentExercise.objectives.map(o => {
                return (
                    <div className='objective' key={o.id}>
                        <Checkbox {...label} />
                        <p>{o}</p>
                    </div>
                )
            })}</div>
            <h3 style={{ textAlign: 'start' }}>Logs:</h3>
            <div className='log-list'>{logList && logList.map(l => {
                return (
                    <p key={l.id} onClick={() => handleClick(l)}>{l.date}</p>
                )
            })}</div>
            <Link href={currentExercise.gitHubUrl} underline="hover">Go to GitHub Repository</Link>
        </div>
    )
}

export default ExerciseView