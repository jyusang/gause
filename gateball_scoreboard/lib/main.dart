import 'package:flutter/material.dart';
import 'package:gateball_scoreboard/scoreboard.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: SafeArea(
        child: Center(
          child: AspectRatio(
            aspectRatio: 1,
            child: Scoreboard(),
          ),
        ),
      ),
    );
  }
}
