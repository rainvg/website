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
        'title': 'Open the installer',
        'text': 'Once you downloaded the installer from our website, click on it to open it.',
        'screenshot': 'assets/images/screenshots/installer.png'
      },
      {
        'title': 'Install the application',
        'text': 'Just drag and drop RAIN into your Applications folder, as indicated by the arrow.',
        'screenshot': 'assets/images/screenshots/install.png'
      },
      {
        'title': 'Security issues?',
        'text': 'Double-click on the RAIN app to open it. Depending on your settings, you could be prompted with an "unidentified developer" message. In that case, go to the next step.',
        'screenshot': 'assets/images/screenshots/security.png'
      },
      {
        'title': 'Do a secondary-click on the installed RAIN app',
        'text': 'Double-click on the Applications folder where you just dragged the RAIN app to open it. Look for the RAIN app, then click on it with the secondary click (aka right click). Select "Open".',
        'screenshot': 'assets/images/screenshots/secondaryclick.png'
      },
      {
        'title': 'Confirm the authorization',
        'text': 'When prompted with a confirmation message to authorize RAIN to start, just click on "Open".',
        'screenshot': 'assets/images/screenshots/confirm.png'
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
