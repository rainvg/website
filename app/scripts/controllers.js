'use strict';

angular.module('rain.controllers', []).controller('navbar-controller', ['$scope', function($scope)
{
  return $scope;
}]).controller('download-section-controller', ['$scope', 'deviceDetector', function($scope, device_detector)
{
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
      'x64': 'https://rain.vg/downloads/windows-x64/setup_x64.exe'
    },
    'linux': 'https://rain.vg/downloads/linux/'
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
}]);
