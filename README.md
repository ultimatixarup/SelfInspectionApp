## InspectionMaster: Vehicle inspection app using Hroku based inspection services from Toyota

The app uses ionic 2 framework uses Angular 5.2.10

Pre-requisit to run the app on browser simulator:

1. You need to first install node.js and npm, refer to following url.
  ```
   https://www.npmjs.com/get-npm
  ```

2. Install the the latest beta version of the Ionic CLI:
    ```
    npm install -g ionic
    ```

3. Clone this repository
    ```
    git clone https://github.tfs.toyota.com/yama-antaka/inspection-mobile-app
    ```
    
4. Navigate to the barcodescanner directory:
    ```
    cd barcodescanner
    ```

5. Install the dependencies
    ```
    npm install
    ```
    
6. Start the app in the browser
    ```
    ionic serve
    ```
This will pop up a browser window with address (http://localhost:8100) and the app will be launched on the browser.
You need to resize the browser to simulate the phone experience.

# Running app on browser window will not have camera related capabilities like barcode scanning and photo upload. #
The camera plugin requires iOS simulator or a real device. Browser simlation shall not have any camera related functionality available.


Additional Resources:

- Ionic reference : (https://ionicframework.com/getting-started)

- AngularJS reference: (https://angular.io/tutorial)
