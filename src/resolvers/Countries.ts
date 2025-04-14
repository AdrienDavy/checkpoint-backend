import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";

@Resolver()
export class CountriesResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[] | null> {
    const countries = await Country.find();
    return countries;
  }

  @Query(() => [Country], { nullable: true })
  async countriesByContinent(
    @Arg("continent") continent: string
  ): Promise<Country[] | null> {
    const countries = await Country.findBy({ continent });
    if (!countries) return null;
    if (countries.length === 0) return null;
    if (!countries.every((country) => country.continent === continent))
      return null;
    return countries;
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    const country = await Country.findOneBy({ code });
    if (!country) return null;
    if (country.code !== code) return null;
    return country;
  }

  @Mutation(() => Country, { nullable: true })
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Country> {
    const newCountry = new Country();
    newCountry.code = code;
    newCountry.name = name;
    newCountry.emoji = emoji;
    newCountry.continent = continent;
    await newCountry.save();
    return newCountry;
  }
}
