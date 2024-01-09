import React, { useState } from "react";

import { Select, Typography, Row, Col, Avatar, Card } from "antd";

import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

import demoImage from "../images/demo.jpg";

const { Text, Title } = Typography;

const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState("Cryptocurrency");

  const { data: cryptoNews, isError } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);

  //console.log(cryptoNews.data);

  if (!cryptoNews?.data) return "Loading...";

  if (isError) {
    return "Error fetching data. Please check console for details";
  }
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setnewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase())
              }
            >
              <option value="Cryptocurrency">Cryptocurrency</option>
              {data?.data?.coins.map((coin) => (
                <option value={coin.name}>{coin.name}</option>
              ))}
            </select>
          </Col>
        )}

        {cryptoNews.data.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    <img
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                      src={news?.thumbnail || demoImage}
                      alt="news"
                    />

                    {news.title}
                  </Title>
                </div>
                <p>
                  {news.description.length > 300
                    ? `${news.description.substring(0, 300)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news?.thumbnail} alt="news" />
                    <Text className="provider-name"></Text>
                  </div>
                  <Text>{moment(news.createdAt).startOf("ss").fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
