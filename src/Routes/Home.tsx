import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "./utilites";
import Category from "./Components/Movie/Category";
import { AnimatePresence } from "framer-motion";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  color: white;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
  color: white;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  const { data: nowPlayingData, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    () => getMovies("now_playing")
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>

          <SliderWrapper>
            <AnimatePresence>
              <Category category="now_playing" title="popular on Netflix" />
              <Category category="upcoming" title="upcoming" />
              <Category category="top_rated" title="top_rated" />
            </AnimatePresence>
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
