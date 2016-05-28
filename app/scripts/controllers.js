'use strict';

angular.module('rain.controllers', []).controller('navbar-controller', ['$scope', function($scope)
{
  return $scope;
}]).controller('download-section-controller', ['$scope', 'deviceDetector', function($scope, device_detector)
{
  $scope.code_copied = false;

  $scope.steps = {
    'mac': [
      {
        'title': 'Open the installer',
        'text': 'Once you downloaded the installer from our website, click on it to open it.',
        'screenshot': 'assets/images/screenshots/mac/installer.png'
      },
      {
        'title': 'Install the application',
        'text': 'Just drag and drop RAIN into your Applications folder, as indicated by the arrow.',
        'screenshot': 'assets/images/screenshots/mac/install.png'
      },
      {
        'title': 'Security issues?',
        'text': 'Double-click on the RAIN app to open it. Depending on your settings, you could be prompted with an "unidentified developer" message. In that case, go to the next step.',
        'screenshot': 'assets/images/screenshots/mac/security.png'
      },
      {
        'title': 'Do a secondary-click on the installed RAIN app',
        'text': 'Double-click on the Applications folder where you just dragged the RAIN app to open it. Look for the RAIN app, then click on it with the secondary click (aka right click). Select "Open".',
        'screenshot': 'assets/images/screenshots/mac/secondaryclick.png'
      },
      {
        'title': 'Confirm the authorization',
        'text': 'When prompted with a confirmation message to authorize RAIN to start, just click on "Open".',
        'screenshot': 'assets/images/screenshots/mac/confirm.png'
      }
    ],
    'windows': [
      {
        'title': 'Launch the installer',
        'text': 'Double-click on the installer to launch the installation process. An User Account Control window will appear, click on Yes to confirm that you intend to proceed.',
        'screenshot': 'assets/images/screenshots/windows/user_access.png'
      },
      {
        'title': 'Follow the installation wizard',
        'text': 'The installation wizard will guide you through the installation process. The default settings are likely to suit the needs of most of the users, but feel free to make some personalisation.',
        'screenshot': 'assets/images/screenshots/windows/accept.png'
      },
      {
        'title': 'Installation in progress',
        'text': 'After the configuration is complete, the installation wizard will automatically install RAIN on your computer.',
        'screenshot': 'assets/images/screenshots/windows/installing.png'
      },
      {
        'title': 'Setup completed',
        'text': 'When the setup is completed, make sure that the "Launch Rain" checkbox is checked: RAIN will automatically start in a few seconds.',
        'screenshot': 'assets/images/screenshots/windows/finished.png'
      }
    ],
    'linux': [
      {
        'title': 'Open the Terminal',
        'text': 'After copying the command above, open the Terminal. Under Ubuntu, you can find it by typing "Terminal" the Search Utility.',
        'screenshot': 'assets/images/screenshots/linux/howtofind.png'
      },
      {
        'title': 'Paste the command',
        'text': 'Paste the command you copied in the Terminal. You can do that by selecting Edit > Paste or by pressing Shift + Ctrl + V.',
        'screenshot': 'assets/images/screenshots/linux/terminal.png'
      },
      {
        'title': 'Enter your password',
        'text': 'The procedure will install RAIN automatically. After the download is completed, you will be asked for your password: just type it (it is normal if nothing appears when you type) and press Enter.',
        'screenshot': 'assets/images/screenshots/linux/install_snapshot.png',
        'video': true,
        'video_mp4': 'assets/images/screenshots/linux/install.mp4',
        'video_webm': 'assets/images/screenshots/linux/install.webm'
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
  $scope.detected_arch = platform.os.architecture;

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

  this.copy = function()
  {
    $scope.code_copied = true;
    $scope.$apply();
    setTimeout(this.code_unselect, 1000);
  };

  this.code_unselect = function()
  {
    $scope.code_copied = false;
    $scope.$apply();
  };
}]);
