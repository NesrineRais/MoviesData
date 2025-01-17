import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAllMovies } from '../actions/moviesAction'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Movie from './movie';
import MovieCategory from './movieCategory';
import { Stack, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';


const Home = (props) => {
    const items = props.item;

    const [likedMovie, updateLikedMovie] = useState([]);
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(4)
    const [movies, setMovies] = useState([])

    const onClickNext = () => {
        //console.log("coucouNext")
        console.log(items.movies)
        if (max <= movies.length - 1) {
            setMin(min => min + 4)
            setMax(max => max + 4)
            console.log("min next", min)
            console.log("max next", max)
        }
    }

    const onClickPrev = () => {
        //console.log("coucouPrev")
        if (min >= 4) {

            setMin(min => min - 4)
            setMax(max => max - 4)
            console.log("min pre", min)
            console.log("max prev", max)
        }
    }

    const handleSelectChange = (e) => {
        // console.log(e.target.value)
        setMax(e.target.value);
    }

    useEffect(() => {

        !items.movies.length && props.loadAllMovies();
        setMovies(items.moviesFiltered);

        // eslint-disable-next-line
    }, [props])

    return (

        <Container fluid="md" className="m-5" >
            <h1>Movies</h1>
            <Row>
                <MovieCategory />
                {movies != null &&
                    // eslint-disable-next-line
                    movies.map((movie, key) => {
                        if (key >= min && key < max) {
                            return (

                                <Col key={key}>
                                    <Card style={{ width: '18rem' }} className='mb-5' >
                                        <Movie
                                            key={key}
                                            movie={movie}
                                            updateLikedMovie={updateLikedMovie}
                                            likedMovie={likedMovie}
                                            man={min}
                                            max={max}
                                        />
                                    </Card>

                                </Col>
                            )
                        }
                    })}


                {/* Pagination */}
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                >
                    <Box sx={{ width: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Films / Page</InputLabel>
                            <Select
                                labelId="select-label"
                                id="simple-select"
                                value={max}
                                label="Films / Page"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={onClickPrev}
                    >
                        Précédent
                    </Button>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={onClickNext}
                    >
                        Suivant
                    </Button>
                </Stack>
            </Row>
        </Container>

    )
}

const mapStateToProps = (store) => {
    return {
        item: store.movies,
    }
}

const mapDispatchToProps = {
    loadAllMovies,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
