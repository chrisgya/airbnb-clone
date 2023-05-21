import useCountries, { formattedCountries } from "@/app/hooks/useCountries";

//https://www.toptal.com/react/testing-react-hooks-tutorial
//https://vaskort.medium.com/how-to-unit-test-your-custom-react-hook-with-react-testing-library-and-jest-8bdefafdc8a2

describe("useCountries", () => {
  let countriesHook: ReturnType<typeof useCountries>;

  beforeEach(() => {
    countriesHook = useCountries();
  });

  it("returns all countries", () => {
    const allCountries = countriesHook.getAll();
    expect(allCountries).toEqual(expect.arrayContaining(formattedCountries));
  });

  it("returns a country by value", () => {
    const country = countriesHook.getByValue("US");
    expect(country).toEqual({
      value: "US",
      label: "United States",
      flag: "🇺🇸",
      latlng: [38, -97],
      region: "Americas",
    });
  });

  it("returns undefined when no country is found by value", () => {
    const country = countriesHook.getByValue("ZZ");
    expect(country).toBeUndefined();
  });
});
