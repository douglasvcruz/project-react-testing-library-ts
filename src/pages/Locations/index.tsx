import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./style.css";

function Locations() {
  const [locations, setLocations] = useState<any[]>([]);
  const [disabled, setDisabled] = useState([true, false]);
  const { makeFetch, isLoading } = useFetch();

  const nextButton = async () => {
    const result = await makeFetch(locations.next);
    if (result.next === null) {
      setDisabled([false, true]);
    } else {
      setDisabled([false, false]);
    }
    setLocations(result);
  };

  const previousButton = async () => {
    const result = await makeFetch(locations.previous);
    if (result.previous === null) {
      setDisabled([true, false]);
    } else {
      setDisabled([false, false]);
    }
    setLocations(result);
  };

  const fetchPoke = async () => {
    const result = await makeFetch("https://pokeapi.co/api/v2/location");
    setLocations(result);
  };

  useEffect(() => {
    fetchPoke();
  }, []);
  return (
    <section>
      <h2>{`Location Pokédex`}</h2>
      <section className="location-container">
        {!isLoading
          ? locations.results?.map((a) => (
              <p className="location" data-testid={a.name} key={a.name}>
                {a.name}
              </p>
            ))
          : "Loading..."}
      </section>
        <button className="button-text location-button" type="button" disabled={disabled[0]} onClick={previousButton}>
          Previous
        </button>
        <button className="button-text location-button" type="button" disabled={disabled[1]} onClick={nextButton}>
          Next
        </button>
    </section>
  );
}

export default Locations;
