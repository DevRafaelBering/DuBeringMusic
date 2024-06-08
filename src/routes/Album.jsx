import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Album.css";
const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setAlbum(res.data);
      });
  }, []);

  return (
    album.id && (
      <div className="album">
        <div className="album-cover">
          <div
            className="album-image-container"
            style={{
              backgroundImage: `url(${album?.images[0].url})`,
            }}
          >
            <div className="album-info">
              <h1>{album.name}</h1>
              <p>
                {album.artists.reduce((acc, artist) => {
                  return acc ? acc + ", " + artist.name : artist.name;
                }, "")}
              </p>
            </div>
          </div>
        </div>
        <div className="tracks">
          {album.tracks.items.map((item) => {
            const date = new Date(item.duration_ms);
            return (
              <div className="track" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.artists.reduce((acc, artist) => {
                      return acc ? acc + ", " + artist.name : artist.name;
                    }, "")}
                  </p>
                </div>

                <p>
                  {date.getMinutes()}:{date.getSeconds()}{" "}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};
export default Album;
