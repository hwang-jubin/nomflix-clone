import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSearch, IGetSearch } from "../api";
import styled from "styled-components";
import { makeImagePath } from "./utilites";
import { motion } from "framer-motion";

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  padding: 10px 0;
`;

const Wrapper = styled.div``;

const Title = styled.div`
  color: white;
  margin-top: 100px;
  margin-bottom: 20px;
  font-weight: 700;
  margin-left: 30px;
`;

const Box = styled.div<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  border-radius: 15px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: movieData } = useQuery<IGetSearch>(["movie", keyword], () =>
    getSearch("movie", keyword || "")
  );

  const { data: tvData } = useQuery<IGetSearch>(["tv", keyword], () =>
    getSearch("tv", keyword || "")
  );
  return (
    <>
      <Wrapper>
        <Title>Movies</Title>
        <Row>
          {movieData?.results.map(
            (searchData) =>
              searchData.backdrop_path && (
                <Box
                  bgPhoto={makeImagePath(searchData.backdrop_path, "w500")}
                ></Box>
              )
          )}
        </Row>
      </Wrapper>
      <Wrapper>
        <Title>Tvs</Title>
        <Row>
          {tvData?.results.map(
            (searchData) =>
              searchData.backdrop_path && (
                <Box
                  bgPhoto={makeImagePath(searchData.backdrop_path, "w500")}
                ></Box>
              )
          )}
        </Row>
      </Wrapper>
    </>
  );
}

export default Search;
