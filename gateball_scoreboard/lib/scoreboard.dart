import 'package:flutter/material.dart';

class Scoreboard extends StatefulWidget {
  const Scoreboard({super.key});

  @override
  State<Scoreboard> createState() => _ScoreboardState();
}

class _ScoreboardState extends State<Scoreboard> {
  bool _active = false;
  int lastX = 0;
  int lastY = 0;

  void _handleTap() {
    setState(() {
      _active = !_active;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapUp: (details) {
        var box = context.findRenderObject() as RenderBox;
        box.size.height;
        var position = box.localToGlobal(Offset.zero);
        print(">>> tap up");
        print(details.localPosition.dx);
        print(details.localPosition.dy);
        print(position.dx);
        print(position.dy);
        print("<<<");
      },
      child: Container(
        decoration: BoxDecoration(
          color: _active ? Colors.lightGreen[700] : Colors.grey[600],
        ),
        child: Center(
          child: Text(
            _active ? 'Active' : 'Inactive',
            style: const TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
