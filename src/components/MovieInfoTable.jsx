/* eslint-disable react/prop-types */
const MovieInfoTable = ({ movieDetails }) => {
  const {
    genres,
    overview,
    releaseDate,
    countries,
    status,
    languages,
    budget,
    revenue,
    tagline,
    productionCompanies,
  } = movieDetails;
  return (
    <div className="max-w-4xl mx-auto">
      <table className="w-full border-collapse text-[#A8B5DB]">
        <tbody>
          <tr>
            <td className="py-2.5 pr-4 align-top font-medium w-1/4">Generes</td>
            <td className="py-2.5">
              <div className="flex gap-2 flex-wrap">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-[#221F3D] rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </td>
          </tr>

          <tr>
            <td className="py-2.5 pr-4 align-top font-medium">Overview</td>
            <td className="py-2.5">{overview}</td>
          </tr>

          <tr>
            <td className="py-2.5 pr-4 align-top font-medium">Release date</td>
            <td className="py-2.5">{releaseDate}</td>
          </tr>

          <tr>
            <td className="py-2.5 pr-4 align-top font-medium">Countries</td>
            <td className="py-2.5">
              <div className="flex gap-2 flex-wrap">
                {countries.map((country, index) => (
                  <span key={country}>
                    <span className="text-sm">{country}</span>
                    {index < countries.length - 1 && (
                      <span className="text-slate-500 ml-2">•</span>
                    )}
                  </span>
                ))}
              </div>
            </td>
          </tr>

          <tr>
            <td className="py-2.5 pr-4 align-top font-medium">Status</td>
            <td className="py-2.5">{status}</td>
          </tr>

          <tr>
            <td className="py-2.5 pr-4 align-top font-medium">Language</td>
            <td className="py-2.5">
              <div className="flex gap-2 flex-wrap">
                {languages.map((language, index) => (
                  <span key={language}>
                    <span className="text-sm">{language}</span>
                    {index < languages.length - 1 && (
                      <span className="text-slate-500 ml-2">•</span>
                    )}
                  </span>
                ))}
              </div>
            </td>
          </tr>

          <tr>
            <td className="py-2.5 pr-4 align-top font-medium">Budget</td>
            <td className="py-2.5">{budget}</td>
          </tr>

          <tr>
            <td className="py-2.5 pr-4 align-top font-medium">Revenue</td>
            <td className="py-2.5">{revenue}</td>
          </tr>

          <tr>
            <td className="py-2.5 pr-4 align-top font-medium">Tagline</td>
            <td className="py-2.5">{tagline}</td>
          </tr>

          <tr>
            <td className="py-2.5 pr-4 align-top font-medium">
              Production Companies
            </td>
            <td className="py-2.5">
              <div className="flex gap-2 flex-wrap">
                {productionCompanies.map((company, index) => (
                  <span key={company}>
                    <span className="text-sm">{company}</span>
                    {index < productionCompanies.length - 1 && (
                      <span className="text-slate-500 ml-2">•</span>
                    )}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MovieInfoTable;
