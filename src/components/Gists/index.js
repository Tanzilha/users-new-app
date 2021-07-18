import { keys, map, clone, values, head } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGists, addGist, delGist, saveGist, updateGist } from '../../actions/gists'
import { Button,Input } from 'antd';


export const Gists = () => {
 
    const dispatch = useDispatch()
    const gists = useSelector(state => state.gists.gists)
    const singleGist = useSelector(state => state.gists.gist)
    console.log("single gist fetch id", singleGist.id)
    
    useEffect(() => {   // for first time loading
        dispatch(fetchGists())

    }, [])

    const [gist, setGist] = useState({})

    const changeHandler = (event) => {
        const values = clone(gist)
        const newgist = event.target.value
        values[event.target.name] = newgist
        setGist(values)
      }

      const addHandler = () => {
          dispatch(addGist(gist))
      }

      const deleteHandler = (gist) => {
          dispatch(delGist(gist))
      }

      const saveHandler = (gist) => {
        console.log("save singlegist",gist, gist.id)

        dispatch(saveGist(gist)) ////???
        // console.log("save gist",gist,gist.id)
        // console.log("save singlegist",gist, gist.id)
      }

      const editHandler = (gist) => {
          dispatch(updateGist(gist))
          console.log("gist to edit", singleGist, singleGist.id)
          const data = {}

          data.title = singleGist.description
          data.id = singleGist.id
          data.fileName =  head(keys(singleGist.files))
        //   console.log("data id",data.id)
          data.content = singleGist.files[head(keys(singleGist.files))].content //getting file name as a key 
        //   const gist = clone(singleGist)
        //   console.log("gist", gist)
          setGist(data)
      }

    return (
        <div>
            <Input type="text" placeholder="Title" name="title" value={gist.title} onChange={changeHandler} style={{ marginBottom: '10px' }} />
            <Input type="text" placeholder="File Name" name="fileName" value={gist.fileName} onChange={changeHandler} style={{ marginBottom: '10px' }}  />
            <Input type="text" placeholder="Content" name="content" value={gist.content} onChange={changeHandler} style={{ marginBottom: '10px' }} />
            <Button  type="primary" onClick={addHandler} style={{margin: '0 auto', marginTop: '20px', marginRight: '20px' }}>Add</Button>
            <Button  type="primary" onClick={() => saveHandler(gist)} style={{margin: '0 auto', marginTop: '20px', marginRight: '20px' }}>update</Button>
            <Button>logout</Button>
            <h3>Gists</h3>
            <ul>
                {
                    map(gist => {
                        return(
                            <li key={gist.id}>
                                {gist.id} - {keys(gist.files)} - {gist.url}
                                <Button onClick={() => deleteHandler(gist)}>delete</Button>
                                <Button onClick={() => editHandler(gist)}>Edit Gist</Button>
                            </li>
                        )
                    }, gists)
                }
            </ul>
        </div>
    )
}
