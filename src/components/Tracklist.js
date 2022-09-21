import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from 'axios'


const Tracklist = () => {
    const [data, setData] = useState(null)
    const {id} = useParams()
    const URL = `http://metallizer.dk/api/json/DOOM${id}`

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(URL)
            const string = res.data.split('jsonMetallizerAlbum(')
            const obj = string[1].split('\n);')
            const artistData = JSON.parse(obj[0])
            setData(artistData)
        }
        fetchData()
    }, [])
    
    
    return (
        <div className="tracklist">
            {data ?
            data.tracks.map((track) => (
                <p className="track" key={track}>{track}</p>
            )) : <h3>Loading...</h3>}
        </div>
    )
}


export default Tracklist