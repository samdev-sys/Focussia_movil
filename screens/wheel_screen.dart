
import 'dart:math' as math;
import 'package:flutter/material.dart';

class WheelScreen extends StatelessWidget {
  const WheelScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Wheel of Life"), backgroundColor: Colors.transparent),
      body: Column(
        children: [
          const SizedBox(height: 20),
          const Text("Diagnostic Tool", style: TextStyle(color: Color(0xFF2BEE79), fontWeight: FontWeight.bold, letterSpacing: 2)),
          const SizedBox(height: 40),
          Center(
            child: SizedBox(
              width: 300,
              height: 300,
              child: CustomPaint(
                painter: RadarChartPainter(
                  scores: [7, 8, 4, 6, 9, 5, 4, 8],
                  labels: ["Health", "Growth", "Money", "Career", "Family", "Fun", "Env", "Spirit"],
                ),
              ),
            ),
          ),
          const Spacer(),
          Padding(
            padding: const EdgeInsets.all(24.0),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF2BEE79),
                minimumSize: const Size(double.infinity, 64),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              onPressed: () {},
              child: const Text("SAVE & GENERATE INSIGHTS", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
            ),
          ),
          const SizedBox(height: 100),
        ],
      ),
    );
  }
}

class RadarChartPainter extends CustomPainter {
  final List<double> scores;
  final List<String> labels;

  RadarChartPainter({required this.scores, required this.labels});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2;
    
    final gridPaint = Paint()..color = Colors.white.withOpacity(0.1)..style = PaintingStyle.stroke;
    final dataPaint = Paint()..color = const Color(0xFF2BEE79).withOpacity(0.3)..style = PaintingStyle.fill;
    final borderPaint = Paint()..color = const Color(0xFF2BEE79)..style = PaintingStyle.stroke..strokeWidth = 2;

    // Draw grid circles
    for (var i = 1; i <= 5; i++) {
      canvas.drawCircle(center, radius * (i / 5), gridPaint);
    }

    // Draw data polygon
    final path = Path();
    for (var i = 0; i < scores.length; i++) {
      final angle = (i * 2 * math.pi / scores.length) - math.pi / 2;
      final x = center.dx + (radius * (scores[i] / 10)) * math.cos(angle);
      final y = center.dy + (radius * (scores[i] / 10)) * math.sin(angle);
      if (i == 0) path.moveTo(x, y); else path.lineTo(x, y);
    }
    path.close();
    canvas.drawPath(path, dataPaint);
    canvas.drawPath(path, borderPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
