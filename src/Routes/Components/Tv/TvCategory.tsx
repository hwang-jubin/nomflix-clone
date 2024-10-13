import { useQuery } from "react-query";
import { getTv, IGetMoviesResult } from "../../../api";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeImagePath } from "../../utilites";
import styled from "styled-components";
import BigTv from "./BigTv";

const offset = 6;

export const Slider = styled.div`
  position: relative;
`;

export const SliderTitle = styled.div`
  color: white;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  padding: 10px 0;
`;

export const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  border-radius: 15px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const RightArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: rgba(125, 127, 127, 0.9);
  position: absolute;
  right: 10px;
  top: 0;
  border-radius: 15px;
`;

export const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

export const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

export const BigOverview = styled.p`
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: ${(props) => props.theme.white.lighter};
`;

export const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

export const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    zIndex: 100,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
  exit: {
    zIndex: 100,
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

interface ICategory {
  category: string;
  title: string;
}

function TvCategory({ category, title }: ICategory) {
  const history = useHistory();
  const { scrollY } = useScroll();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/tv/:movieId");
  const { data } = useQuery<IGetMoviesResult>(["tv", category], () =>
    getTv(category)
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (data && !leaving) {
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/tv/${movieId}`);
  };
  const onOverlayClick = () => history.push("/tv");

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <>
      <Slider>
        <SliderTitle>{title}</SliderTitle>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={`${category}_${movie.id}`}
                  key={movie.id}
                  whileHover="hover"
                  initial="normal"
                  exit="exit"
                  variants={boxVariants}
                  onClick={() => onBoxClicked(movie.id)}
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
            <RightArrow onClick={increaseIndex}>&gt;</RightArrow>
          </Row>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {clickedMovie && (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            <BigTv clickedMovie={clickedMovie} scrollY={scrollY.get()} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default TvCategory;
