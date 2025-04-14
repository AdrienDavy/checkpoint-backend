import { Arg, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country";

@Resolver()
export class CountriesResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[] | null> {
    const countries = await Country.find();
    return countries;
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    const country = await Country.findOneBy({ code });
    if (!country) return null;
    if (country.code !== code) return null;
    return country;
  }
}
