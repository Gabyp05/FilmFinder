import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "./Spinner";
import MovieInfoTable from "./MovieInfoTable";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    vote_count,
    poster_path,
    backdrop_path,
    release_date,
    original_language,
  },
}) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fetchMovieDetails = async () => {
    if (movieDetails) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${BASE_URL}/movie/${id}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error(`Error fetching movie details: ${error}`);
      setErrorMessage("Error fetching movie details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const movieDetailsInfo = movieDetails
    ? {
        genres: movieDetails.genres.map((genre) => genre.name),
        overview: movieDetails.overview,
        releaseDate: movieDetails.release_date,
        countries: movieDetails.production_countries.map(
          (country) => country.name
        ),
        status: movieDetails.status,
        languages: movieDetails.spoken_languages.map((lang) => lang.name),
        budget: `$${movieDetails.budget.toLocaleString()}`,
        revenue: `$${movieDetails.revenue.toLocaleString()}`,
        tagline: movieDetails.tagline,
        productionCompanies: movieDetails.production_companies.map(
          (company) => company.name
        ),
      }
    : null;

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      fetchMovieDetails();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOpenChange}
      className="border-none"
    >
      <DialogTrigger asChild>
        <div className="movie-card cursor-pointer">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : "/no-movie.webp"
            }
            alt={title}
            width={213}
            height={320}
          />

          <div className="mt-4">
            <h3>{title}</h3>

            <div className="content">
              <div className="rating">
                <img src="star.svg" alt="Star Icon" />
                <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
              </div>

              <span>•</span>
              <p className="lang">{original_language}</p>

              <span>•</span>
              <p className="year">
                {release_date ? release_date.split("-")[0] : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl h-[90vh] border-none dialog-content overflow-y-auto p-6">
        <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <>
            <div className="flex flex-row items-center justify-between ">
              <div className="flex flex-row gap-1 capitalize text-[#A8B5DB] font-medium text-base mb-2 sm:mb-0">
                <p className="year ">
                  {release_date ? release_date.split("-")[0] : "N/A"}
                </p>
                <span>•</span>
                <p className="lang">{original_language}</p>
              </div>

              <div className="bg-[#221F3D] rounded-md w-fit px-4 py-2.5">
                <div className="flex flex-row space-x-2 text-base">
                  <img src="star.svg" alt="Star Icon" className="w-5 h-5" />
                  <p className="text-white font-semibold">
                    {vote_average ? vote_average.toFixed(1) : "N/A"}
                  </p>
                  <p className="text-[#A8B5DB]">/ 10 ({vote_count})</p>
                </div>
              </div>
            </div>
            {movieDetails && (
              <div className="flex flex-col items-center gap-6">
                <img
                  src={
                    backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
                      : "/no-poster.webp"
                  }
                  className="rounded-lg object-cover w-full max-w-2xl"
                  alt={title}
                />

                <MovieInfoTable movieDetails={movieDetailsInfo} />
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MovieCard;

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
    release_date: PropTypes.string,
    original_language: PropTypes.string,
  }).isRequired,
};
