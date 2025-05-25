📚 BookStore App
This project contains a .NET Web API backend and an Angular frontend. The API uses XML for data storage and supports multiple environments. The frontend communicates with the backend to display and manage books.

# Backend
git clone https://github.com/your-username/bookstore-api.git
cd bookstore-api

# Frontend
git clone https://github.com/your-username/bookstore-ui.git
cd bookstore-ui

#
⚙️ Run Backend (.NET API)
Navigate to the backend folder:
cd bookstore-api/BookStoreApi

#
# Set the desired environment: Choose one of: Development | Production
For Production : 
At the front Run : ng build --configuration production 
At the Server run : dotnet watch run --launch-profile "BookStoreApi"

#
Run the API:
dotnet run
Swagger will be available at:
https://localhost:5013/swagger for development or http://localhost:7071/swagger for production

# 🌐 Run Frontend (Angular)
Navigate to frontend folder:

cd bookstore-ui
Install dependencies: npm install

Run Angular dev server:

ng serve
Visit the UI:
http://localhost:4200

# 🧪 Environment-Specific Data
The API supports switching XML file storage via environment:

appsettings.Development.json → bookstore.dev.xml
appsettings.Production.json → bookstore.xml

Each contains a different XmlFilePath. Set the environment as shown earlier and restart the API to switch data files.