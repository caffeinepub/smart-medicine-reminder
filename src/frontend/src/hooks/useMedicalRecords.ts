import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useActor } from "./useActor";

export interface DoctorGuidance {
  id: string;
  doctorName: string;
  treatment: string;
  notes: string;
  date: string;
}

export interface CheckupReport {
  id: string;
  visitDate: string;
  doctorName: string;
  notes: string;
}

export function useDoctorGuidance() {
  const { actor, isFetching } = useActor();
  return useQuery<DoctorGuidance[]>({
    queryKey: ["doctorGuidance"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (await (
          actor as any
        ).getAllDoctorGuidance()) as DoctorGuidance[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDoctorGuidance() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (guidance: DoctorGuidance) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).addDoctorGuidance(guidance);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["doctorGuidance"] });
      toast.success("Doctor guidance added");
    },
    onError: () => toast.error("Failed to add doctor guidance"),
  });
}

export function useUpdateDoctorGuidance() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (guidance: DoctorGuidance) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).updateDoctorGuidance(guidance);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["doctorGuidance"] });
      toast.success("Doctor guidance updated");
    },
    onError: () => toast.error("Failed to update doctor guidance"),
  });
}

export function useDeleteDoctorGuidance() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).deleteDoctorGuidance(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["doctorGuidance"] });
      toast.success("Doctor guidance deleted");
    },
    onError: () => toast.error("Failed to delete doctor guidance"),
  });
}

export function useCheckupReports() {
  const { actor, isFetching } = useActor();
  return useQuery<CheckupReport[]>({
    queryKey: ["checkupReports"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (await (actor as any).getAllCheckupReports()) as CheckupReport[];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCheckupReport() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (report: CheckupReport) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).addCheckupReport(report);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["checkupReports"] });
      toast.success("Checkup report added");
    },
    onError: () => toast.error("Failed to add checkup report"),
  });
}

export function useUpdateCheckupReport() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (report: CheckupReport) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).updateCheckupReport(report);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["checkupReports"] });
      toast.success("Checkup report updated");
    },
    onError: () => toast.error("Failed to update checkup report"),
  });
}

export function useDeleteCheckupReport() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).deleteCheckupReport(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["checkupReports"] });
      toast.success("Checkup report deleted");
    },
    onError: () => toast.error("Failed to delete checkup report"),
  });
}
