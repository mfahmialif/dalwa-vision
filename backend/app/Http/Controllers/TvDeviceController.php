<?php

namespace App\Http\Controllers;

use App\Models\TvDevice;
use Illuminate\Http\Request;

class TvDeviceController extends Controller
{
    /**
     * Auto-mark devices as offline if heartbeat is stale (>2 minutes).
     */
    private function refreshStatuses(): void
    {
        TvDevice::where('status', 'online')
            ->where('last_heartbeat', '<', now()->subMinutes(2))
            ->update(['status' => 'offline']);
    }

    // ── Admin: list all devices ──
    public function index(Request $request)
    {
        $this->refreshStatuses();

        $query = TvDevice::query();

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('location', 'like', "%{$s}%")
                  ->orWhere('ip_address', 'like', "%{$s}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('orientation')) {
            $query->where('orientation', $request->orientation);
        }

        $sortBy = $request->input('sort_by', 'created_at');
        $sortDir = $request->input('sort_dir', 'desc');
        $allowed = ['created_at', 'name', 'status', 'last_heartbeat'];
        if (in_array($sortBy, $allowed)) {
            $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');
        } else {
            $query->orderByDesc('created_at');
        }

        $perPage = $request->input('per_page', 12);

        return $query->paginate($perPage);
    }

    // ── Admin: stats ──
    public function stats()
    {
        $this->refreshStatuses();

        return response()->json([
            'total'   => TvDevice::count(),
            'online'  => TvDevice::where('status', 'online')->count(),
            'offline' => TvDevice::where('status', 'offline')->count(),
            'setup'   => TvDevice::where('status', 'setup')->count(),
            'warning' => TvDevice::whereNotNull('warning_message')->count(),
        ]);
    }

    // ── Admin: create device ──
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'location'    => 'nullable|string|max:255',
            'orientation' => 'nullable|in:landscape,portrait',
        ]);

        $device = TvDevice::create([
            'name'          => $request->name,
            'location'      => $request->location,
            'orientation'   => $request->input('orientation', 'landscape'),
            'token'         => TvDevice::generateToken(),
            'status'        => 'setup',
            'registered_by' => $request->user()?->id,
        ]);

        return response()->json($device, 201);
    }

    // ── Admin: update device ──
    public function update(Request $request, TvDevice $tvDevice)
    {
        $request->validate([
            'name'            => 'required|string|max:255',
            'location'        => 'nullable|string|max:255',
            'orientation'     => 'nullable|in:landscape,portrait',
            'warning_message' => 'nullable|string|max:500',
        ]);

        $tvDevice->update($request->only([
            'name', 'location', 'orientation', 'warning_message',
        ]));

        return response()->json($tvDevice);
    }

    // ── Admin: delete device ──
    public function destroy(TvDevice $tvDevice)
    {
        $tvDevice->delete();
        return response()->json(['message' => 'Perangkat berhasil dihapus.']);
    }

    // ── Admin: regenerate token ──
    public function regenerateToken(TvDevice $tvDevice)
    {
        $tvDevice->update([
            'token'  => TvDevice::generateToken(),
            'status' => 'setup',
        ]);

        return response()->json($tvDevice);
    }

    // ── Public: TV connects with token ──
    public function connect(Request $request)
    {
        $request->validate([
            'token' => 'required|string|size:6',
        ]);

        $device = TvDevice::where('token', $request->token)->first();

        if (!$device) {
            return response()->json(['message' => 'Token tidak valid.'], 404);
        }

        $device->update([
            'status'         => 'online',
            'ip_address'     => $request->ip(),
            'last_heartbeat' => now(),
        ]);

        return response()->json([
            'message' => 'Terhubung berhasil.',
            'device'  => $device,
        ]);
    }

    // ── Public: TV heartbeat ──
    public function heartbeat(Request $request)
    {
        $request->validate([
            'token' => 'required|string|size:6',
        ]);

        $device = TvDevice::where('token', $request->token)->first();

        if (!$device) {
            return response()->json(['message' => 'Token tidak valid.'], 404);
        }

        $device->update([
            'ip_address'       => $request->ip(),
            'last_heartbeat'   => now(),
            'firmware_version' => $request->input('firmware_version', $device->firmware_version),
            'status'           => 'online',
        ]);

        return response()->json(['status' => 'ok']);
    }
}
