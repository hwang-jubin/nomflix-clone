// BigMovie.tsx
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../../utilites";
import { getDetail, IDetail, IMovie } from "../../../api";
import { useQuery } from "react-query";

const BigMovieContainer = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: #10172a;
  z-index: 1000;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  position: relative;
`;

const BigDetails = styled.div`
  display: flex;
  position: absolute;
  top: 60%;
  left: 10px;
  text-align: center;
  div {
    padding: 0 10px;
    height: 20px;
    font-weight: 500;
    background-color: white;
    border-radius: 15px;
    margin-right: 5px;
  }
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: absolute;
  top: 65%;
  color: ${(props) => props.theme.white.lighter};
`;

const Vote = styled.span`
  color: #288f5b;
  font-weight: 600;
  margin-right: 10px;
`;

interface BigMovieProps {
  clickedMovie: IMovie;
  scrollY: number;
}

const BigMovie: React.FC<BigMovieProps> = ({ clickedMovie, scrollY }) => {
  const { data } = useQuery<IDetail>(["movies", clickedMovie.title], () =>
    getDetail("movie", clickedMovie.id)
  );

  console.log(data?.genres[1].name);

  return (
    <BigMovieContainer
      style={{ top: scrollY + 100 }}
      layoutId={`movie_${clickedMovie.id}`}
    >
      <BigCover
        style={{
          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
            clickedMovie.backdrop_path,
            "w500"
          )})`,
        }}
      />
      <BigTitle>{clickedMovie.title}</BigTitle>

      <BigDetails>
        <Vote>{data && Math.floor(data.vote_average * 10) + "%"}</Vote>
        {data?.genres.map((detail) => (
          <div>{detail.name}</div>
        ))}
      </BigDetails>
      <BigOverview>{clickedMovie.overview}</BigOverview>
    </BigMovieContainer>
  );
};

export default BigMovie;
