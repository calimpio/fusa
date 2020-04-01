- # AppScript Web Aplication With React.JS

- ## Install
    1. Intall clasp: `npm i @google/clasp -g`    
    2. `clasp push`
    
    - To your current Google Drive
    1. `$ git clone https://github.com/calimpio/fusa.git`
    2. `$ clasp login`
        1. License problem on Windows: `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser`    
    3. `$ clasp create [app_script_name]`
    3. `app/config/app` change `google_drive_sheetbook_id` value for `Google.Sheet id`
    3. clasp push

    -fast commands:
    1. `npm run watch`
    1. `node finish`

    


- #Todo
    - Login View
    - `ImportTool gruffAuth` in route `/intro` first method
    
    


- #Changelog

- ##[0.1.5] 2020-03-1 
    - added `react.js`
    - added `webpack builder`

- ##[0.1.5] 2019-06-1 
    - added `controller/main app_router`
    - added `webpack builder`
    

- ##[0.1.4] 2018-09-24
    - changed `intro session`
    - added `components\product`
    - added `componnets\auth\`
        - `login`
        - `register`

- ##[0.1.3] 2018-09-18
    - added `Vaildation_` and `app/config/validation_rules`
    - changed `model` and `MigrationModel` by `SheetModel`
    - added method `Validation_.getErrors`



- ##[0.1.2] 2018-09-18
    - texted login
    - texted session

- ##[0.1.1] 2018-09-18
    - fixed login
    - fixed session

- ##[0.1.0] 2018-09-18
    - changed `assets\tools\globalAuth` to `assets\tools\gruffAuth`


- ##[0.0.9] 2018-09-14
    - added `controllers/auth/login`
    - added `Session_`
    - added `SheetModel_`


- ##[0.0.8] 2018-09-14
    - edited `tools\Pagination` root

- ##[0.0.7] 2018-09-14
    - edited `readme.md`


- ##[0.0.6] 2018-09-14
    - edited `tools\SheetModel\item`
        - added belongsTo relationship 

- ##[0.0.5] 2018-09-14
    - edited `views\asset\tools`:
        - `ImportTemplate` file : `folder-filename`
        - `Async_Comp` name : `folder-filename`

- ##[0.0.4] 2018-09-14
    - delete bad implementations: `log`
    

- ##[0.0.3] 2018-09-14
    - add `appscript.json` was missiing
    - change todo readme

- ##[0.0.2] 2018-09-13
    - updating readme install 

- ##[0.0.1] 2018-09-13
    - init `gruff` 
