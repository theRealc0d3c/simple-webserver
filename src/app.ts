import express from "express";
import { allFakers, allLocales, LoremModule } from "@faker-js/faker";
const app = express();
const port = 3000;
import cors from "cors";

app.use(cors()); // enable CORS from every origin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface Faker {
	[key: string]: () => string;
}

app.get("/", async (req, res) => {
	if (
		!req.query["locale"] ||
		!req.query["module"] ||
		!req.query["function"] ||
		!req.query["parameters"]
	) {
		return res
			.status(400)
			.send(
				"Missing parameters. Expected to get locale, module, function and parameters as GET parameters, whereas the parameter 'parameters' is an stringified JSON object which contains another parameters attribute, which is a list of parameters to pass to the specified function."
			);
	}

	const locale = req.query["locale"] as keyof typeof allFakers;
	const faker = allFakers[locale];

	if (!faker) {
		return res.status(404).send("Locale not found");
	} else {
		const moduleToExecute = req.query["module"] as keyof typeof faker;
		const module = faker[moduleToExecute] as any;

		if (!module) {
			return res.status(404).send("Module not found");
		} else {
			const functionToExecute = req.query["function"] as string;
			const func = module[functionToExecute] as Function;

			if (!func) {
				return res.status(404).send("Function not found");
			} else {
				const parametersToPass = req.query["parameters"] as string;
				let parameters: any[] = [];

				try {
					parameters = JSON.parse(parametersToPass).parameters;
				} catch (e) {
					return res
						.status(400)
						.send("Invalid parameters. Expected a JSON string.");
				}

				await delay(parseInt(req.query["delay"] as string) || 0);
				return res.status(200).json(func(...parameters));
			}
		}
	}
});

app.listen(port, "0.0.0.0", () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});

const delay = (milliseconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
