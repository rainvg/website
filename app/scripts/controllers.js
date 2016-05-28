'use strict';

angular.module('rain.controllers', []).controller('navbar-controller', ['$scope', function($scope)
{
  return $scope;
}]).controller('download-section-controller', ['$scope', 'deviceDetector', function($scope, device_detector)
{
  $scope.code86_copied = false;
  $scope.code64_copied = false;
  $scope.steps = {
    'mac': [
      {
        'title': 'Combining over 100 years of hard work and shared family knowledge',
        'text': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'screenshot': 'assets/images/screenshot.png'
      },
      {
        'title': 'Combining over 100 years of hard work and shared family knowledge',
        'text': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'screenshot': 'assets/images/screenshot.png'
      },
      {
        'title': 'Combining over 100 years of hard work and shared family knowledge',
        'text': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'screenshot': 'assets/images/screenshot.png'
      }
    ],
    'windows': [
      {
        'title': 'Combining over 100 years of hard work and shared family knowledge',
        'text': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'screenshot': 'assets/images/screenshot.png'
      },
      {
        'title': 'Combining over 100 years of hard work and shared family knowledge',
        'text': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'screenshot': 'assets/images/screenshot.png'
      },
      {
        'title': 'Combining over 100 years of hard work and shared family knowledge',
        'text': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'screenshot': 'assets/images/screenshot.png'
      }
    ],
    'linux': [
      {
        'title': 'Combining over 100 years of hard work and shared family knowledge',
        'text': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'screenshot': 'assets/images/screenshot.png'
      }
    ]
  };

  $scope.endpoints = {
    'mac': 'https://rain.vg/downloads/osx/installer.dmg',
    'windows': {
      'x86':'https://rain.vg/downloads/windows/windows-x86/setup_x86.exe',
      'x64': 'https://rain.vg/downloads/windows/windows-x64/setup_x64.exe'
    },
    'linux': {
      'x86': 'https://rain.vg/downloads/linux/',
      'x64': 'https://rain.vg/downloads/linux/linux-x86/rain.tar.gz'
    }
  };

  $scope.detected_os = device_detector.os;

  switch(device_detector.os)
  {
    case 'mac':
      $scope.os = 'Mac OSX';
      break;
    case 'windows':
      $scope.os = 'Windows';
      break;
    case 'linux':
      $scope.os = 'Linux';
      break;
    default:
      $scope.os = 'Unknown';
    break;
  }

  this.copy_x86 = function()
  {
    $scope.code86_copied = true;
    $scope.$apply();
    setTimeout(this.code86_unselect, 1000);
  };

  this.copy_x64 = function()
  {
    $scope.code64_copied = true;
    $scope.$apply();
    setTimeout(this.code64_unselect, 1000);
  };

  this.code86_unselect = function()
  {
    $scope.code86_copied = false;
    $scope.$apply();
  };
  this.code64_unselect = function()
  {
    $scope.code64_copied = false;
    $scope.$apply();
  };
}]);
