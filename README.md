![Project Banner](https://banapi.oriondev.fr/?name=Banner%20Generator&description=Little%20API%20to%20generate%20a%20custom%20banner%20for%20my%20projects.)

# Banner Generator
Little API to generate a custom banner for my projects.

## Installation
1. Clone this repository
```bash
git clone https://github.com/oriionn/bannerGenerator.git 
```
2. Go to the project folder
```bash
cd bannerGenerator
```
3. Install dependencies
```bash
npm install
```
4. Create a .env file and add your environment variables
```bash
nano .env
```
Example:
```dotenv
PORT=3000
```
5. Run the project
```bash
npm start
```
6. Open your browser and go to http://localhost:3000

## Usage
### GET /
Return a custom banner
#### Parameters
| Name | Type | Description                                        |
|------| --- |----------------------------------------------------|
| name | string | Name of the project                                |
| description | string | Description of the project (Limit: 100 characters) |

#### Example
```bash
http://localhost:3000/?name=Banner%20Generator&description=Little%20API%20to%20generate%20a%20custom%20banner%20for%20my%20projects.
```

## License
The project is under the [MIT License](LICENSE).

## Contributors
![Contributors](https://contrib.rocks/image?repo=oriionn/bannerGenerator)