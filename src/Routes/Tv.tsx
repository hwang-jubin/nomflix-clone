import { useQuery } from "react-query";
import styled from "styled-components";
import { getTv, IGetTvResult } from "../api";
import { makeImagePath } from "./utilites";

import { AnimatePresence } from "framer-motion";
import TvCategory from "./Components/Tv/TvCategory";

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
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Tv() {
  const { data, isLoading } = useQuery<IGetTvResult>(["tv", "on_the_air"], () =>
    getTv("on_the_air")
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].original_name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>

          <SliderWrapper>
            <AnimatePresence>
              <TvCategory category="on_the_air" title="on_the_air on Netflix" />
              <TvCategory category="popular" title="popular" />
              <TvCategory category="top_rated" title="top_rated" />
            </AnimatePresence>
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
