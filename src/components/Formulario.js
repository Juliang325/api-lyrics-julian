import React, { useState } from 'react'

export const Formulario = () => {


    const [letra, setLetra] = useState('buscando')
    const [artista, setArtista] = useState('')
    const [cancion, setCancion] = useState('')
    const [buscando, setBuscando] = useState(false)
    const [letrasEncontradas, setLetrasEncontradas] = useState([])

    function handlerArtista(e) {
        setArtista(e.target.value)
    }

    function handlerCancion(e) {
        setCancion(e.target.value)
    }

    function buscarLetra() {
        setBuscando(true)
        fetch(`https://api.lyrics.ovh/v1/${artista}/${cancion}`)
            .then((resp) => resp.json())
            .then((data) => {
                setLetra(data);
                setBuscando(false);
                setLetrasEncontradas([...letrasEncontradas, { artista, cancion, letra: data.lyrics }])
            })
    }

  return (
    <div>
        <label>Grupo/Artista: </label>
        <input type='text' onChange={handlerArtista}></input>
        <br/>
        <label>Cancion: </label>
        <input type='text' onChange={handlerCancion}></input> 
        <br/>
        <button onClick={buscarLetra} disabled={buscando}>Buscar</button>
        <br/>
        <p>{buscando && <p>Buscando..</p>}</p>
        <table>
                <thead>
                    <tr>
                        <th>Grupo/Artista</th>
                        <th>Cancion</th>
                        <th>Letra</th>
                    </tr>
                </thead>
                <tbody>
                    {letrasEncontradas.map((item, index) => (
                        <tr key={index}>
                            <td>{item.artista}</td>
                            <td>{item.cancion}</td>
                            <td>{item.letra}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
        
    </div>
  )
}
