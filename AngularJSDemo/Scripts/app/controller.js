var EmpControllers = angular.module("EmpControllers", []);

// this controller call the api method and display the list of employees
// in list.html
EmpControllers.controller("ListController", ['$http',
    function ($http) {
        var vm = this;

        $http.get('/api/employee').success(function (data) {
            vm.employees = data;
        });
    }]
);

// this controller call the api method and display the record of selected employee
// in delete.html and provide an option for delete
EmpControllers.controller("DeleteController", ['$http', '$routeParams', '$location',
        function ($http, $routeParams, $location) {
            var vm = this;

            vm.id = $routeParams.id;
            $http.get('/api/employee/' + $routeParams.id).success(function (data) {
                vm.firstname = data.FirstName;
                vm.lastname = data.LastName;
                vm.country = data.Country;
                vm.state = data.State;
                vm.salary = data.Salary;
                vm.active = data.IsActive;
                vm.dob = data.DateofBirth;
                vm.description = data.Description;
            });

            this.delete = function () {

                $http.delete('/api/Employee/' + vm.id).success(function (data) {
                    $location.path('/list');
                }).error(function (data) {
                    vm.error = "An error has occured while deleting employee! " + data;
                });
            };
        }
]);

// this controller call the api method and display the record of selected employee
// in edit.html and provide an option for create and modify the employee and save the employee record
EmpControllers.controller("EditController", ['$filter', '$http', '$routeParams', '$location',
    function ($filter, $http, $routeParams, $location) {
        var vm = this;

        $http.get('/api/country').success(function (data) {
            vm.countries = data;
        });

        vm.id = 0;
        vm.getStates = function () {
            var country = vm.country;
            if (country) {
                $http.get('/api/country/' + country).success(function (data) {
                    vm.states = data;
                });
            }
            else {
                vm.states = null;
            }
        }

        this.save = function () {
            var vm = this;

            var obj = {
                EmployeeId: vm.id,
                FirstName: vm.firstname,
                LastName: vm.lastname,
                Country: vm.country,
                State: vm.state,
                Salary: vm.salary,
                IsActive: vm.active,
                Description: vm.description,
                DateofBirth: vm.dob
            };

            if ($scope.id == 0) {

                $http.post('/api/Employee/', obj).success(function (data) {
                    $location.path('/list');
                }).error(function (data) {
                    vm.error = "An error has occured while adding employee! " + data.ExceptionMessage;
                });
            }
            else {

                $http.put('/api/Employee/', obj).success(function (data) {
                    $location.path('/list');
                }).error(function (data) {
                    console.log(data);
                    vm.error = "An Error has occured while Saving customer! " + data.ExceptionMessage;
                });
            }
        }

        if ($routeParams.id) {

            vm.id = $routeParams.id;
            vm.title = "Edit Employee";

            $http.get('/api/employee/' + $routeParams.id).success(function (data) {
                vm.firstname = data.FirstName;
                vm.lastname = data.LastName;
                vm.country = data.Country;
                vm.state = data.State;
                vm.salary = data.Salary;
                vm.active = data.IsActive;
                vm.description = data.Description;
                vm.dob = new Date(data.DateofBirth);

                vm.getStates();
            });
        }
        else {
            vm.title = "Create New Employee";
        }
    }
]);